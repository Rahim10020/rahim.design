---
title: "Murmur"
order: 4
category: "Mobile"
description: "A personal, offline voice-first app that captures your ideas in seconds — and brings them back when they matter."
tags: ["Mobile", "Voice", "Productivity", "Flutter"]
imageHeight: "h-120"
role: "Design & Development"
platform: "Mobile (Android)"
year: "2026"
link: "https://murmur-landing-three.vercel.app"
imageSrc: "/images/projects/murmur/home.webp"
---

| ROLE                 | PLATFORM         | YEAR |
| -------------------- | ---------------- | ---- |
| Design & Development | Mobile (Android) | 2026 |

![Murmur project image — à remplacer](/images/projects/murmur/home.webp)

## The context

**It all starts with a problem.**

An idea comes to mind — in the shower, on a walk, in the middle of something else. By the time you open a notes app and find the right folder, it's already fading. Murmur was built around one belief: capturing a thought should take seconds, and keeping it should be effortless.

## The challenge

**The challenge: protect the idea before anything else.**

Most capture tools ask you to organize before you save — a title, a category, a project. Murmur takes the opposite stance. The real challenge was to design an experience where saving a voice note is instant and reliable, while still making it possible to find, revisit and act on ideas later — without ever turning the app into a task manager.

## The approach

**So how to solve this?**

Everything revolves around a simple loop: murmur an idea, let it be saved, and let Murmur bring it back at the right moment. Reminders are optional and private, and a quiet weekly session resurfaces a few older ideas you haven't looked at in a while. No accounts, no cloud, no transcription — your voice stays on your phone.

## UX

**Before we think about pixels, let's think about the journey.**

![Murmur UX — à remplacer](/images/others/image_placeholder.svg)

The journey is deliberately short: open the app, tap the main action, speak, stop, done. From there, each idea can be listened to, renamed, given a status, or attached to a reminder. Nothing is required before the recording is safe — organization always comes after, never before.

## UI Design

**Once the route was clear, we could finally talk about the interface.**

![Murmur UI design — à remplacer](/images/others/image_placeholder.svg)

The interface is calm and minimal, focused on one thing at a time. The recording state is always obvious — you never wonder whether your voice is being captured. System, light and dark themes are all supported, and the app is available in both French and English.

## Important decisions

Some decisions that changed the experience.

- **Capture first, organize later.** No title, category or folder is ever required before an idea is safely saved.
- **Private by default.** No account, no server, no analytics — audio and metadata stay in the app's private storage on the device.
- **Reminders that don't shout.** Notifications are discreet and never reveal the content of an idea; tapping one opens the right idea, nothing more.
- **Rediscovery, not recommendation.** A small weekly session surfaces a few older ideas in a deterministic, understandable way — no AI, no black box.

## Development

**The design was ready. Now it had to be brought to life.**

![Murmur Development — à remplacer](/images/others/image_placeholder.svg)

Murmur was built as a personal, offline-first application for Android, with data safety treated as a first-class concern. Audio is written to a private directory before any metadata is stored, reminders are reconciled with the system at startup, and the app includes a complete export and restore system so ideas can survive a lost or reinstalled phone.

The project is open source and available on GitHub: [github.com/Rahim10020/murmur.app](https://github.com/Rahim10020/murmur.app)

The landing page is available at: [murmur-landing-three.vercel.app](https://murmur-landing-three.vercel.app)

## The result

**And finally, it looks like this.**

![Murmur result — à remplacer](/images/others/image_placeholder.svg)

A quiet, dependable tool that does one thing well: keep your ideas safe until you're ready to come back to them.

## What I learned

Building Murmur taught me that reliability is a design decision, not an afterthought. A single lost recording would undermine the whole promise of the app, so every choice — from how audio is saved to how reminders are reconciled — had to prioritize trust over features. It also confirmed that constraints, like refusing AI and cloud, can lead to a product that feels more personal, not less.
