<script lang="ts">
    import { createTable, Render, Subscribe } from "svelte-headless-table";
    import { addPagination, addSortBy, addTableFilter, addHiddenColumns, addSelectedRows } 
    from "svelte-headless-table/plugins";
    import * as Table from "$lib/components/ui/table";
    import DataTableActions from "./userOnboardActions.svelte";
    import { Button } from "$lib/components/ui/button";
    import { ChevronDown, SortDesc } from "lucide-svelte";
    import { Input } from "$lib/components/ui/input";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import UserAdminCheckBox from "./userOnboardCheckBox.svelte";
    import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { createRender } from 'svelte-headless-table';
  
    type UserData = {
        id: string;
        userID: string;
        prefix: string;
        firstName: string;
        middleName: string;
        lastName: string;
        email: string;
    };
  
    let dataStore = writable<UserData[]>([]);
  
    const tableConfig = {
        page: addPagination(),
        sort: addSortBy({ disableMultiSort: true }),
        filter: addTableFilter({
            fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase())
        }),
        hide: addHiddenColumns(),
        select: addSelectedRows()
    };
  
    async function printFirestoreCollection() {
    try {
        const firestore = getFirestore();
        const querySnapshot = await getDocs(collection(firestore, 'userOnboard'));
        const newData: UserData[] = [];

        for (const queryDoc of querySnapshot.docs) {
            const { UserID } = queryDoc.data();
            const userDocPath = `Users/${UserID}`;
            const userDocSnapshot = await getDoc(doc(firestore, userDocPath)); 

            if (userDocSnapshot.exists()) {
                const userData: UserData = {
                    id: queryDoc.id,
                    userID: UserID,
                    firstName: userDocSnapshot.data()?.firstName || "",
                    middleName: userDocSnapshot.data()?.middleName || "",
                    lastName: userDocSnapshot.data()?.lastName || "",
                    email: userDocSnapshot.data()?.email || "",
                    prefix: userDocSnapshot.data()?.prefix || ""
                };
                newData.push(userData);
            }
        }

        console.log('Data from Firestore:', newData);
        dataStore.set(newData);
        localStorage.setItem('userData', JSON.stringify(newData));
    } catch (error) {
        console.log('Error fetching Firestore collection:', error);
    }
}

    onMount(printFirestoreCollection);
    let table = createTable(dataStore, tableConfig);
  
    const columns = table.createColumns([
        table.column({
            accessor: "id",
            header: (_, { pluginStates }) => {
                const { allPageRowsSelected } = pluginStates.select;
                return createRender(UserAdminCheckBox, {
                    checked: allPageRowsSelected
                });
            },
            cell: ({ row }, { pluginStates }) => {
                const { getRowState } = pluginStates.select;
                const { isSelected } = getRowState(row);
                return createRender(UserAdminCheckBox, {
                    checked: isSelected
                });
            },
            plugins: {
                sort: {
                    disable: true
                },
                filter: {
                    exclude: true
                }
            }
        }),
        table.column({
            accessor: "userID",
            header: "User ID"
        }),
        table.column({
            accessor: ({ prefix, firstName, middleName, lastName }) => `${prefix}. ${firstName} ${middleName} ${lastName}`.trim(),
            header: "Name"
        }),
        table.column({
            accessor: "email",
            header: "Email"
        }),
        table.column({
            accessor: ({ id }) => id,
            header: "",
            cell: ({ value }) => createRender(DataTableActions, { id: value }),
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
  
    const hidableCols = ["userID"];
</script>
  
<div>
    <div class="flex items-center py-4">
        <div>
            <Input class="max-w-sm bg-white" placeholder="Filter user ID..." type="text" bind:value={$filterValue}/>
        </div>
        <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild let:builder>
                <Button variant="outline" class="ml-auto" builders={[builder]}>
                    Columns <ChevronDown class="ml-2 h-4 w-4"/>
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                {#each flatColumns as col}
                    {#if hidableCols.includes(col.id)}
                        <DropdownMenu.CheckboxItem bind:checked={hideForId[col.id]}>
                            {col.header}
                        </DropdownMenu.CheckboxItem>
                    {/if}
                {/each}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
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
                                        {#if cell.id === "email"}
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