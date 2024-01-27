---
title: "Typesaurus X is out!"
description: The best way to use Firestore with TypeScript is now even better!
pubDate: "Jan 26 2024"
---

**TL;DR;**: A new major version of type-safe ODM for Firestore is out with a brand new API and docs website.

→ [Ready to jump in? Follow the Getting Started guide](https://typesaurus.com/get-started/)

## What is Typesaurus?

Typesaurus is a universal wrapper around Firestore Web and Admin SDKs, enabling you to use the same database code on the client and server. It allows you to define your database schema in TypeScript types and checks all operations for correctness. It helps to catch bugs, prevent runtime errors, and ensure data consistency. On top of that, it provides API sugar and a first-class React integration. It’s lightweight and has zero dependencies. Interested?

## About this version

You probably never heard of it, but Typesaurus has been around for a while. I published the very first version 5 years ago. Back then, it was just a gbasic wrapper that added type-safety to Firestore.

Since then, it has evolved a lot. I used it full-time for building production apps, and whenever I would find a bug or data inconsistency caused by a Firestore quirk or type flaw, I would make the types even stronger and smarter. I also added a lot of API sugar and React integration.

Two years ago, I finally pushed the TypeScript capabilities to the maximum. I only thought a little about API design when I started, and unfortunately, it couldn't accommodate growing expectations anymore. So, with accumulated Firestore and TypeScript experience, I reimagined the API from scratch and started working on Typesaurus X.

I decided to skip a few versions to get that sweet X inspired by [Apple's MacOS X](https://en.wikipedia.org/wiki/MacOS#Mac_OS_X). Unfortunately, during the time Elon Musk overtook Twitter and renamed it to X. While it makes me cringe to think about this association, I decided to stick with the name.

The rewrite took a ton of time. I started sketching API while my wife was still pregnant. I worked on the MVP [while being on parental leave](https://twitter.com/kossnocorp/status/1569892908823904257). Now my baby girl runs, and talks, and Typesaurus X is finally ready.

I'm happy with the result. Along with new advanced API and full type safety, the version comes with [a brand new docs website](https://typesaurus.com/). I meticulously documented every single API method and type and added a lot of guides and examples. I went the extra mile and wrote a series of guides where I share my experience designing a robust schema. I hope you will find it helpful.

### Quick demo

Without further ado, let's see Typesaurus in action. Here's a simple blog post component (don't worry, you don't have to use React. It's just an example):

```ts
import { db } from "./db";
import { useRead } from "@typesaurus/react";

export interface PostProps {
  slug: string;
}

export function PostPage(props: PostProps) {
  // Query post by slug
  const [result] = useRead(
    db.posts.query(($) => $.field("slug").eq(props.slug))
  );
  const post = result?.[0];

  const [comments] = useRead(
    // Wait for the post to load before loading the comments
    post?.ref.id &&
      DB.posts(post.ref.id).comments.query(($) =>
        $.field("publishedAt").order()
      ).on // 👈 .on enables real-time updates
  );

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <PostPreview post={post} />
      <hr />
      <Comments post={post} comments={comments} />
    </div>
  );
}
```

In this example, we queried a post by slug and then subscribed to real-time updates of its comments. And it's all without writing a single line of API!

→ [See it in a Sandbox](https://codesandbox.io/p/devbox/9lm3zl?file=%2Fsrc%2FApp.tsx%3A27%2C1&layout=%257B%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522horizontal%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522ROOT_LAYOUT%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522UNKNOWN%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522clrudkl2q00063j6hbnpi4sc5%2522%252C%2522sizes%2522%253A%255B70%252C30%255D%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522EDITOR%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522EDITOR%2522%252C%2522id%2522%253A%2522clrudkl2p00023j6hwb3hvx99%2522%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522direction%2522%253A%2522horizontal%2522%252C%2522id%2522%253A%2522SHELLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522SHELLS%2522%252C%2522id%2522%253A%2522clrudkl2p00033j6hmqq1b4jh%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%257D%252C%257B%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522direction%2522%253A%2522vertical%2522%252C%2522id%2522%253A%2522DEVTOOLS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522contentType%2522%253A%2522DEVTOOLS%2522%252C%2522id%2522%253A%2522clrudkl2p00053j6h5sw43sfy%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%255D%252C%2522sizes%2522%253A%255B60%252C40%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clrudkl2p00023j6hwb3hvx99%2522%253A%257B%2522id%2522%253A%2522clrudkl2p00023j6hwb3hvx99%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clrudkl2p00013j6hihmk5wfj%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fpublic%252Findex.html%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%252C%257B%2522type%2522%253A%2522FILE%2522%252C%2522filepath%2522%253A%2522%252Fnode_modules%252F%2540babel%252Fparser%252Flib%252Findex.js%2522%252C%2522initialSelections%2522%253A%255B%257B%2522startLineNumber%2522%253A10400%252C%2522endLineNumber%2522%253A10400%252C%2522startColumn%2522%253A23%252C%2522endColumn%2522%253A23%257D%255D%252C%2522id%2522%253A%2522clruf602w01qb3j6dug2ibdio%2522%252C%2522mode%2522%253A%2522temporary%2522%252C%2522state%2522%253A%2522IDLE%2522%257D%255D%252C%2522activeTabId%2522%253A%2522clruf602w01qb3j6dug2ibdio%2522%257D%252C%2522clrudkl2p00053j6h5sw43sfy%2522%253A%257B%2522id%2522%253A%2522clrudkl2p00053j6h5sw43sfy%2522%252C%2522activeTabId%2522%253A%2522clrugb5t904ya3j6dd571emky%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522UNASSIGNED_PORT%2522%252C%2522port%2522%253A5173%252C%2522id%2522%253A%2522clrugb5t904ya3j6dd571emky%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522path%2522%253A%2522%252Fposts%252Fhello-world%2522%257D%255D%257D%252C%2522clrudkl2p00033j6hmqq1b4jh%2522%253A%257B%2522id%2522%253A%2522clrudkl2p00033j6hmqq1b4jh%2522%252C%2522tabs%2522%253A%255B%257B%2522id%2522%253A%2522clrudqoet00353j6dec0tep6z%2522%252C%2522mode%2522%253A%2522permanent%2522%252C%2522type%2522%253A%2522TERMINAL%2522%252C%2522shellId%2522%253A%2522clrudqoq9000qe5glbned8jq2%2522%257D%255D%252C%2522activeTabId%2522%253A%2522clrudqoet00353j6dec0tep6z%2522%257D%257D%252C%2522showDevtools%2522%253Atrue%252C%2522showShells%2522%253Atrue%252C%2522showSidebar%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%257D)

---

You might be wondering, what is this `db` object? With Typesaurus, you define your database schema in a single place. Here's what it looks like:

```ts
import { Typesaurus, schema } from "typesaurus";

export const db = schema(($) => ({
  posts: $.collection<Post>().sub({
    comments: $.collection<Comment>(),
  }),
}));

export type Schema = Typesaurus.Schema<typeof db>;

export interface Post {
  slug: string;
  title: string;
  text: string;
  publishedAt: Typesaurus.ServerDate;
}

export interface Comment {
  name: string;
  text: string;
  publishedAt: Typesaurus.ServerDate;
}
```

In the example, we have a simple database with the `posts` collection and the `comments` `subcollection`. The `db` instance provides access to all the collections. It’s the only one import you need to work with the database.

You will use the same `db` object on the client and server—Typesaurus resolves which adapter to use via [`package.json`'s exports](https://nodejs.org/api/packages.html#exports). When bundling for the client, it will use Firestore Web SDK; when bundling for the server, it will use Firestore Admin SDK.

Here's what a server-side code might look like:

```ts
import { db } from "./db";
import { groups } from "typesaurus";

// Access collection groups (also typed!) and get all the documents:
const comments = await groups(db).comments.all();

await Promise.all(
  comments.map(async (comment) => {
    const offensive = await isOffensive(comment);
    // Delete offensive comments
    if (offensive) await comment.remove();
  })
);
```

Now, when you seen it in action, let's dive into the details.

## Why to use it?

Ok, this looks sweet, but why bother using a wrapper? Is there anything beyond the sugar?

To answer this question, let's step back and look at the Firestore's advantages and disadvantages.

Unlike traditional SQL databases, Firestore allows a highly flexible schema of practically any shape. While it's incredibly convenient, unless you're careful, your documents might get into a state you don't expect and cause runtime errors, lost data, and many headaches.

That's where types come into play, preserving flexibility while adding structure and preserving your data consistency.

They ensure that what you write matches the schema and save you from Firestore pitfalls, like nested arrays and `undefined` values causing exceptions or server dates being `null` on the client. It will warn and guide you before you make a mistake.

Having your database schema defined in a single place serves as documentation. It makes it easy to understand how the data is structured and makes it easier to involve your application.

On top of that, Typesaurus provides a single unified API for both client and server, which makes it easy to share and reuse your code. And it requires no setup!

Typesaurus is packed with features but is also lightweight and has zero dependencies.

It took me weeks to describe what it does in the docs, so there's no way I'll be able to cover everything in this post.

Instead, I suggest you [follow the Getting Started guide](https://typesaurus.com/get-started/) and discover Typesaurus yourself.

## Roadmap

I might sound cliche, but I'm just getting started. I believe Typesaurus X will provide a long-lasting foundation and won't drastically change anymore, but there are many things around the ecosystem that I want to do.

I already had a working MVP of TypeScript DSL for writing security rules. I want to make it happen for X, too.

I want to automatically generate indices for all your queries

I want first-class integration with Firebase Functions to add type safety to the database hooks.

I plan to build tight integration with Next.js so developers can easily pass the Typesaurus documents between server and client components, enable server caching, etc.

I want to make migrating Firestore a trivial task. Right now, migrating Firestore is a hurdle, but knowing the schema types can be instrumental to making it easy.

There's Realtime Database that also begs for type safety.

I can go on and on, so if you're interested - follow me on Twitter and sponsor me on GitHub!
