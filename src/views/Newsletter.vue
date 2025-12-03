<template>
  <div class="flex flex-col pt-12 gap-6">
    <div class="flex flex-col gap-4">
      <h1 class="text-2">Newsletter</h1>
      <p class="text-7 text-(--foreground-secondary)">
        Want to stay updated on my latest articles, coding tutorials, and personal adventures? Sign
        up for my newsletter! It's a simple way to keep track of new posts and occasional coding
        tips I discover. Just drop your email in the sign-up box, and I'll send you updates whenever
        there's something new to share.
      </p>
      <p class="text-5">
        I'd love to have you along for the ride and also hear about your own journey!
      </p>
    </div>
    <form action="" class="flex flex-col">
      <div>
        <label for="email">Email Address</label>
        <input
          id="email"
          type="email"
          placeholder="email@example.com"
          class="w-full border-2 border-(--border-color) rounded-[10px] px-4 py-2 bg-(--neutral-0) dark:bg-(--neutral-800) focus:outline-0"
        />
      </div>
      <button
        type="submit"
        class="mt-4 bg-(--blue-500) text-(--neutral-900) w-[158px] h-[51px] rounded-[10px] text-6 cursor-pointer"
      >
        Stay Updated
      </button>
      <p class="text-8 text-(--foreground-secondary) mt-2">
        Unsubscribe anytime. No spam, I promise 🙂
      </p>
    </form>
  </div>
</template>
