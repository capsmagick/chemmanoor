<script lang="ts">
    import { onMount } from 'svelte';
  import * as Card from "$lib/components/ui/card";
  import { page } from '$app/stores';
  let mobileMenuOpen = false;

  const toggleMobileMenu = () => {
    mobileMenuOpen = !mobileMenuOpen;
  };

  onMount(() => {
    // Optional: Close the mobile menu on route change if you have a router setup
    // import { page } from '$app/stores';
    // $: $page.path, toggleMobileMenu(false);
  });
   // export let data: LayoutData;

    const navigation = [
      {
        title: 'Profile',
        href: '/Profile/myFamily'
      },
      {
        title: 'Address',
        href: '/Profile/Address'
      },
  
    
    ]
</script>



<div class="flex items-center  bg-white rounded-3xl shadow-md">
  <div class="grid grid-flow-col  gap-4 lg:grid-cols-[120px_1fr] lg:gap-8 backdrop-blur-sm bg-white/30 rounded-3xl shadow-md">
  
  <!-- Desktop sidebar -->
  <div class="mt-20 hidden sm:block">
    <div class="grid ">

      <ul class="justify-self-left place-self-center">
        {#each navigation as navItem}
          <li class="text-lg font-small">
            <a href={navItem.href}
               class="block  my-2 px-10 py-2 rounded-lg transition-colors duration-150"
               class:bg-gray-200={$page.url.pathname === navItem.href}
               class:text-gray-800={$page.url.pathname === navItem.href}
               class:hover:bg-gray-100={$page.url.pathname !== navItem.href}
               class:hover:text-gray-950={$page.url.pathname !== navItem.href}>
              {navItem.title}
            </a>
          </li>
        {/each}
      </ul>
    </div>
   
  </div>
<!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com --> 
<div class ="flex items-center justify-center h-full w-1 mt-36 ">
  <div
    class="h-[250px] min-h-[1em]  w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100">
  </div>
</div>

  <!-- Main content area -->
  <div class="flex items-center justify-center">
    
    <slot></slot>
    
  </div>
</div>
</div>
