<script lang="ts">
    import type { LayoutData } from './$types';
    import * as Card from "$lib/components/ui/card";
    
    export let data: LayoutData;

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
      }
    ]
</script>

<div class="grid grid-flow-col gap-2">
    <div class="row-span-3 ... my-60 ml-20">
        <Card.Root>
            <Card.Header>
              <Card.Title>Profile</Card.Title>
              <Card.Description>Here you can edit your profile details</Card.Description>
            </Card.Header>
            <Card.Content>

              <ul class="menu bg-base-100 w-56 p-2 rounded-box">
                {#each navigation as navItem}
                  <li>
                    <a href={navItem.href} class="font-medium">{navItem.title}</a>
                  </li>
                {/each}
              </ul>

            </Card.Content>
          </Card.Root>
        <p>Menu</p>
    </div>
    <!-- ... -->
    <div class="col-span-2 ... mb-20 ml-10 mr-20">
       <slot>
        
       </slot>
    </div>
  </div>