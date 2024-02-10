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
  
      {
        title: 'Admin',
        href: '/Profile/Admin'
      }
    ]
</script>



<div class="grid ">
  <div class="flex flex-wrap">
  
  <!-- Desktop sidebar -->
  <div class="flex-0 w-1/5  grid  ">
    <div class="grid min-h-full shadow-md  bg-white hover:shadow-lg rounded-3xl w-5/6 place-self-center">

      <ul class="justify-self-left place-self-center">
        {#each navigation as navItem}
          <li class="text-lg font-small">
            <a href={navItem.href}
               class="block  my-2 px-20 py-2 rounded-lg transition-colors duration-150"
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

  <!-- Main content area -->
  <div class="flex-1 justify-items-center grid">
    
    <slot></slot>
    
  </div>
</div>
</div>
