<script lang="ts">
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import { Button } from "$lib/components/ui/button";
    // import { DotsVertical } from "radix-icons-svelte";
    import { DotSquare } from "lucide-svelte";
    export let id: string;
  </script>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger asChild let:builder>
      <Button
        variant="ghost"
        builders={[builder]}
        size="icon"
        class="relative w-8 h-8 p-0"
      >
        <span class="sr-only">Open menu</span>
        <DotSquare class="w-4 h-4" />
      </Button>
    </DropdownMenu.Trigger>
    <DropdownMenu.Content>
      <DropdownMenu.Group>
        <DropdownMenu.Label>Actions</DropdownMenu.Label>
        <DropdownMenu.Item on:click={() => navigator.clipboard.writeText(id)}>
          Copy payment ID
        </DropdownMenu.Item>
        <DropdownMenu.Item>Edit</DropdownMenu.Item>
      </DropdownMenu.Group>
      <DropdownMenu.Separator />
      <DropdownMenu.Item>View User</DropdownMenu.Item>
      <DropdownMenu.Item>Remove User</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>