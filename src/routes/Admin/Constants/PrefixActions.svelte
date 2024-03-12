<script lang="ts">
import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
import { Button } from "$lib/components/ui/button";
import { DotSquare } from "lucide-svelte";
import { getFirestore, doc, updateDoc, getDoc, arrayRemove } from 'firebase/firestore';

export let id: string;

    async function removePrefix(index: number) {
    debugger;
        try {
            const adjustedIndex = index - 1;
            const firestore = getFirestore();
            const prefixRef = doc(firestore, 'constants', 'prefix');
            
            // Get the current document data
            const prefixSnapshot = await getDoc(prefixRef);
            if (prefixSnapshot.exists()) {
                const prefixData = prefixSnapshot.data();
                // Remove the prefix at the specified index from the array
                const updatedPrefixData = prefixData.prefixdata.filter((_item: any, i: number) => i !== adjustedIndex);
                // Update the document with the modified data
                await updateDoc(prefixRef, {
                    prefixdata: updatedPrefixData
                });
                
                console.log('Prefix removed successfully!');
            } else {
                console.log('Prefix document does not exist!');
            }
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