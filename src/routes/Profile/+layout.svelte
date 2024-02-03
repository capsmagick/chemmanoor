<script lang="ts">
    import type { LayoutData } from './$types';
    import * as Card from "$lib/components/ui/card";
    
   // export let data: LayoutData;

    const navigation = [
      {
        title: 'Profile',
        href: '/Profile'
      },
      {
        title: 'Address',
        href: '/Profile/Address'
      },
      {
        title: 'Spouse Details',
        href: '/Profile/SpouseDetails'
      },
      {
        title: 'Parent Details',
        href: '/Profile/ParentDetails'
      },
      {
        title: 'Children Details',
        href: '/Profile/ChildrensDetails'
      },
      {
        title: 'Data Form',
        href: '/Profile/DataForm'
      },
      {
        title: 'Myfamily',
        href: '/Profile/myFamily'
      }
    ]
</script>

<style>
  .navigation-card {
    max-width: 300px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    background-color: #ffffff;
    margin: 16px;
    padding: 16px;
  }

  .navigation-menu {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .navigation-menu li a {
    display: block;
    padding: 8px 16px;
    text-decoration: none;
    color: #333333;
    border-radius: 4px;
    transition: background-color 0.3s ease;
  }

  .navigation-menu li a:hover {
    background-color: #f3f3f3;
  }

  @media (max-width: 640px) {
    .navigation-card {
      margin: 8px;
      padding: 8px;
    }

    .navigation-menu li a {
      padding: 8px;
    }
  }
</style>

<div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="navigation-card">
        <Card.Root>
            <Card.Header>
              <Card.Title>Profile</Card.Title>
              <Card.Description>Here you can edit your profile details</Card.Description>
            </Card.Header>
            <Card.Content>
              <ul class="navigation-menu">
                {#each navigation as navItem}
                  <li>
                    <a href={navItem.href}>{navItem.title}</a>
                  </li>
                {/each}
              </ul>
            </Card.Content>
        </Card.Root>
    </div>
    <div class="col-span-1 md:col-span-2">
       <slot></slot>
    </div>
</div>
