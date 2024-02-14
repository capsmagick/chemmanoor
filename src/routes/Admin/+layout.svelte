<script lang="ts">
    import type { LayoutData } from './$types';
    import { goto } from '$app/navigation';
    
    export let data: LayoutData;

    // Define sidebar items
    const sidebarItems = [
        { label: 'Users', href: '/Admin/Users' },
        { label: 'User Onboard', href: '/Admin/UserOnboard' },
        { label: 'Constants', href: '/Admin/#constants' }
    ];

    // Function to handle sidebar item click
    async function handleSidebarItemClick(event: MouseEvent, href: string) {
        event.preventDefault();
        await goto(href);
        // Handle navigation or other actions
    }
</script>

<div class="flex">
    <!-- Sidebar -->
    <div class="bg-white rounded w-64 flex-shrink-0">
        <div class="p-4">
            <h2 class="text-xl font-semibold">Dashboard</h2>
        </div>
        <ul>
            {#each sidebarItems as item}
                <li>
                    <a href={item.href} class="block px-4 py-2 rounded hover:bg-blue-100"
                     on:click={(e) => handleSidebarItemClick(e, item.href)}>
                        {item.label}
                    </a>
                </li>
            {/each}
        </ul>
    </div>

    <!-- Main content -->
    <div class="flex-grow">
        <!-- Main content goes here -->
        <slot></slot>
    </div>
</div>