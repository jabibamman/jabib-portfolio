---
title: Screaming and hexagonal on Upstra, and what I let through in review
summary: Upstra mixes two architectures that people often set against each other. Rereading its code shows where the dependency rule gave way, and one merge request I approved too quickly.
date: 2026-10-12
tags: [architecture, nestjs, hexagonal, typescript]
published: true
---

Upstra was six months with a team of three at Eurialys. It's a platform that drives a lab's infrastructure: servers, VMs, UPS units, iLO cards. NestJS on the back end, Vue 3 on the front, and a Python service, `ups_manager`, that actually talks to the machines. The code is [public on GitHub](https://github.com/Upstra/infra-control).

I was the lead. I split the tasks, played a bit of project manager, and reviewed the merge requests. The architecture, though, we decided together: the three of us thought about what would be best and picked that. So the flaws below belong to the team, but I was the one approving.

## Screaming plus hexagonal

People often set the two against each other, but they don't answer the same question. Screaming architecture says how to lay out the project: by business domain (`servers/`, `vms/`, `ups/`) rather than by technical role (`controllers/`). Hexagonal says which way dependencies point: the domain knows nothing about the database or HTTP, and the infrastructure implements its ports. Upstra does both.

```
src/modules/
├── servers/
├── vms/
├── ups/
├── ilos/        # HPE iLO cards: remote power on and off
├── rooms/
├── groups/
├── permissions/
└── ...
```

And inside each module, the hexagon's layers:

```
servers/
├── domain/          # entities, domain services, ports (repository interfaces)
├── application/     # use cases, DTOs, controllers
└── infrastructure/  # TypeORM implementations of the repositories
```

When you open the project, you know where to go to touch servers. On that side, it held up well.

## Where it gives way

The domain shouldn't depend on anything. In Upstra, it depends on three things.

**TypeORM.** `Server` carries `@Entity`, `@Column`, `@ManyToOne`, and even Swagger's `@ApiProperty`. It was easier with NestJS and time was short, so that's the road we took. Changing ORM or API format would mean touching the core, but on this project we had no plan to.

**The application's DTOs.** The servers' domain service imports them:

```ts
// servers/domain/services/server.domain.service.ts
import { ServerCreationDto } from '../../application/dto/server.creation.dto';
```

The arrow points the wrong way. It breaks nothing day to day.

**The `ilos` module.** That one is mine, and putting it in the domain was my call. Powering a server on and off was, to me, part of Upstra's business: it belonged there. When I wrote it, everything looked fine to me. Rereading it today, I can see what I put in it:

```ts
// ilos/domain/services/ilo-power.service.ts
import { HttpException, HttpStatus } from '@nestjs/common';
import { PythonExecutorService } from '@/core/services/python-executor';
import { IloPowerAction } from '../../application/dto/ilo-power-action.dto';

// ...
if (httpCode === 401 || message.includes('Authentication failed')) {
  return new HttpException('Invalid iLO credentials', HttpStatus.UNAUTHORIZED);
}
```

The business logic belonged in the domain. Launching Python scripts and returning HTTP codes did not. A domain that throws `HttpException` can only be called over HTTP: if a scheduled job had to shut the servers down during a power cut, it would receive those errors. That part should have been an adapter, in `infrastructure/`.

## The merge request I approved by mistake

Every feature, fix or chore had its own merge request, and I reviewed them before starting a feature.

One of them stuck with me. The code was good, we merged it, and it went to production. And in fact it had broken the link between the front end and the migration: the SQL schema had changed and I hadn't paid attention to it. As soon as I noticed, I caught the database up with a migration script.

If I miss a schema change, I'm not going to spot an `import` pointing the wrong way. Relying on the reviewer's eye to enforce an architecture rule doesn't last long. Tools like `dependency-cruiser` can check the direction of imports in CI.

## Did everything need fixing?

Not necessarily. Separating the domain entity from the persistence entity means one more class and one more mapper per aggregate, on a six-month project with three people. Martin says it himself in his Clean Architecture article: the circles are schematic, and there can be more or fewer of them.

`IloPowerService` has no interface, by the way: one class, one implementation. That wasn't a problem, since NestJS lets you swap the class for a mock in tests. An interface would have added nothing.

I made the opposite mistake on a crowdfunding project. I wanted to build it as microservices, and there were too many of them. It turned into a mess. Since then, I ask myself whether an abstraction answers a need that already exists.

## Today

On my current assignment, I always go through ADRs, which the architects have to validate. I analyze the situation before deciding, and when a topic isn't clear, I set up a meeting to clear it up.
