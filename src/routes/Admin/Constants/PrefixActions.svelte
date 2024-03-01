<script lang="ts">
import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
import { Button } from "$lib/components/ui/button";
import { DotSquare } from "lucide-svelte";
import { getFirestore, doc, updateDoc, arrayRemove } from 'firebase/firestore';

export let id: string;

async function removePrefix(index: number) {
    try {
        const firestore = getFirestore();
        const prefixRef = doc(firestore, 'constants', 'prefix');
        
        // Update the document to remove the value from the array
        await updateDoc(prefixRef, {
            prefixdata: arrayRemove(index)
        });
        
        console.log('Prefix removed successfully!');
    } catch (error) {
        console.error('Error removing prefix:', error);
    }
}

</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger asChild let:builder>
      <Button
          variant="ghost"
          builders={[builder]}
          size="icon"
          class="relative w-8 h-8 p-0">
          <span class="sr-only">Open menu</span>
          <DotSquare class="w-4 h-4" />
      </Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
      <DropdownMenu.Group>
          <DropdownMenu.Label>Actions</DropdownMenu.Label>
          <DropdownMenu.Item>Edit</DropdownMenu.Item>
          <DropdownMenu.Item on:click={() => { console.log(id); removePrefix(parseInt(id)); }}>Remove</DropdownMenu.Item>
      </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>