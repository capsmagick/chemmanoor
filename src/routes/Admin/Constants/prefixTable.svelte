<script lang="ts">
    import { createTable, Render, Subscribe } from "svelte-headless-table";
    import { addPagination, addSortBy, addTableFilter, addHiddenColumns, addSelectedRows } from "svelte-headless-table/plugins";
    import * as Table from "$lib/components/ui/table";
    import DataTableActions from "./PrefixActions.svelte";
    import { Button } from "$lib/components/ui/button";
    import { SortDesc } from "lucide-svelte";
    import { Input } from "$lib/components/ui/input";
    import { getFirestore, collection, getDocs, getDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { createRender } from 'svelte-headless-table';
  
    // Define the Prefix type
    type Prefix = {
        id: number;
        name: string;
    };
  
    // Initialize a writable store for the prefixes data
    let dataStore = writable<Prefix[]>([]);
    let prefixInput: HTMLInputElement;

  
    // Table configuration
    const tableConfig = {
        page: addPagination(),
        sort: addSortBy({ disableMultiSort: true }),
        filter: addTableFilter({
            fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
        }),
        hide: addHiddenColumns(),
        select: addSelectedRows()
    };
  
    // Function to fetch data from Firestore
    async function fetchPrefixes() {
        try {
            const firestore = getFirestore();
            const docRef = doc(firestore, 'constants', 'prefix');
            const docSnapshot = await getDoc(docRef);
            if (docSnapshot.exists()) {
                const prefixData = docSnapshot.data();
                const prefixes = prefixData.prefixdata.map((name: string, index: number) => ({ id: index + 1, name }));
                dataStore.set(prefixes);
                console.log('Prefix data:', prefixes);
            } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error fetching prefixes:', error);
        }
    }
  
    // Fetch data from Firestore when the component mounts
    onMount(fetchPrefixes);
  
    // Create the table using the data store and configuration
    let table = createTable(dataStore, tableConfig);
  
    // Define columns for the table
    const columns = table.createColumns([
        table.column({
            accessor: "id",
            header: "Number"
        }),
        table.column({
            accessor: "name",
            header: "Prefix"
        }),
        table.column({
            accessor: ({ id }) => id,
            header: "",
            cell: ({ value }) => createRender(DataTableActions, { id: value.toString() }),
            plugins: {
                sort: {
                    disable: true
                }
            }
        })
    ]);
  
    // ViewModel for the table
    const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns, rows } = table.createViewModel(columns);
  
    const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
    const { filterValue } = pluginStates.filter;
    const { hiddenColumnIds } = pluginStates.hide;
    const { selectedDataIds } = pluginStates.select;
  
    // Logic for hiding columns
    const ids = flatColumns.map((col) => col.id);
    let hideForId = Object.fromEntries(ids.map((id) => [id, true]));
  
    $: $hiddenColumnIds = Object.entries(hideForId)
        .filter(([, hide]) => !hide)
        .map(([id]) => id);

    // Function to add a new prefix to Firestore
    async function addPrefix() {
        try {
            const prefixValue = prefixInput.value.trim(); // Get the value from the input box and trim any leading/trailing whitespace
            if (!prefixValue) return; // Don't proceed if the input is empty
            
            const firestore = getFirestore();
            const prefixRef = doc(firestore, 'constants', 'prefix');
        
            // Get the current document data
            const prefixSnapshot = await getDoc(prefixRef);
            if (prefixSnapshot.exists()) {
                const prefixData = prefixSnapshot.data();
                
                // Add the new prefix to the existing array
                const updatedPrefixData = [...prefixData.prefixdata, prefixValue];
                
                // Update the document with the modified data
                await updateDoc(prefixRef, {
                    prefixdata: updatedPrefixData
                });
                
                console.log('Prefix added successfully!');
            } else {
                console.log('Prefix document does not exist!');
            }

            // Clear the input box after adding the prefix
            prefixInput.value = '';
        } catch (error) {
            console.error('Error adding prefix:', error);
        }
    }

    // Initialize the input box reference after the component mounts
    onMount(() => {
        prefixInput = document.getElementById('prefix') as HTMLInputElement;
    });
  
  </script>
  
  <div>
    <div class="flex items-center py-4">
        <div>
            <Input class="max-w-sm bg-white" placeholder="Filter prefix..." type="text" bind:value={$filterValue}/>
        </div>
        <div class="pl-4">
            <Input class="bg-white" id="prefix" placeholder="Mr" type="text"/>
        </div>
        <div>
            <Button variant="outline" id="addPrefix" type="button" on:click={addPrefix}>Add Prefix</Button>
        </div>
    </div>
    <div class="rounded-md border">
        <Table.Root {...$tableAttrs} class="bg-white">
            <Table.Header>
                {#each $headerRows as headerRow}
                    <Subscribe rowAttrs={headerRow.attrs()}>
                        <Table.Row>
                            {#each headerRow.cells as cell (cell.id)}
                                <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
                                    <Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">
                                        {#if cell.id === "name"}
                                            <Button variant="ghost" on:click={props.sort.toggle}>
                                                <Render of={cell.render()}/>
                                                <SortDesc class={"ml-2 h-4 w-4"}/>
                                            </Button>
                                        {:else}
                                            <Render of={cell.render()}/>
                                        {/if}
                                    </Table.Head>
                                </Subscribe>
                            {/each}
                        </Table.Row>
                    </Subscribe>
                {/each}
            </Table.Header>
            
            <Table.Body {...$tableBodyAttrs}>
              {#each $pageRows as row (row.id)}
                  <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
                      <Table.Row {...rowAttrs} data-state={$selectedDataIds[row.id] && "selected"}>
                        {#each row.cells as cell (cell.id)}
                          <Subscribe attrs={cell.attrs()} let:attrs>
                            <Table.Cell {...attrs}>
                             
                              {#if typeof cell.render() === 'string'}
                                  {@html cell.render()}
                              {:else}
                                  <Render of={cell.render()}/> 
                              {/if}
                                
                            </Table.Cell>
                          </Subscribe>
                        {/each}
                      </Table.Row>
                  </Subscribe>
              {/each}
          </Table.Body>
        </Table.Root>
    </div>
    <div class="flex items-center justify-end space-x-2 py-4">
        <div class="flex-1 text-sm text-muted-foreground">
            {Object.keys($selectedDataIds).length} of {$rows.length} row(s) selected.
        </div>
        <Button variant="outline" size="sm" on:click={() => ($pageIndex = $pageIndex - 1)} disabled={!$hasPreviousPage}>
            Previous
        </Button>
        <Button variant="outline" size="sm" disabled={!$hasNextPage} on:click={() => ($pageIndex = $pageIndex + 1)}>
            Next
        </Button>
    </div>
  </div>