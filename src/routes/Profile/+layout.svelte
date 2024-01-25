<script lang="ts">
    import type { LayoutData } from './$types';
    import * as Card from "$lib/components/ui/card";
    export let data: LayoutData;
</script>

<div class="grid grid-flow-col gap-2">
    <div class="row-span-3 ... my-60 ml-20">
        <Card.Root>
            <Card.Header>
              <Card.Title>Profile</Card.Title>
              <Card.Description>Here you can edit your profile details</Card.Description>
            </Card.Header>
            <Card.Content>
              <li>
                <a href="">Profile</a>
              </li>
              <li>
                <a href ="Address">Address</a>
              </li>
              <li>
                <a href ="Profile/DataForm">DataForm</a>
              </li>
            </Card.Content>
           
          </Card.Root>
        <p>Menu</p>
    </div>
    <!-- ... -->
    <div class="col-span-2 ... mb-20 ml-10 mr-20">
       <slot></slot>
    </div>
  </div>