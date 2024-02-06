<script lang="ts">
    import { createTable, Render, Subscribe, createRender } 
    from "svelte-headless-table";
    import { addPagination, addSortBy, addTableFilter, addHiddenColumns, addSelectedRows }
    from "svelte-headless-table/plugins";
    import { readable } from "svelte/store";
    import * as Table from "$lib/components/ui/table";
    import DataTableActions from "./UserActions.svelte";
    import { Button } from "$lib/components/ui/button";
    import { ChevronDown, SortDesc } from "lucide-svelte";
    import { Input } from "$lib/components/ui/input";
    import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
    import UserAdminCheckBox from "./UserAdminCheckBox.svelte";

      type Payment = {
        id: string;
        firstName: string;
        middleName: string;
        lastName: string;
        date_of_entry: string;
        email: string;
      };
      const data: Payment[] = [
        {
          id: "m5gr84i9",
          firstName: "Kiran",
          middleName: "K",
          lastName: "Chemmanoor",
          date_of_entry: "12/12/2023",
          email: "abs@demo.com"
        },
        {
          id: "m5gr84i9",
          firstName: "Leo",
          middleName: "L",
          lastName: "Chemmanoor",
          date_of_entry: "24/10/2023",
          email: "kdj@demo.com"
        }
      ];     
    
    const table = createTable(readable(data), {
        page: addPagination(),
        sort: addSortBy({ disableMultiSort: true }),
        filter: addTableFilter({
            fn: ({ filterValue, value }) =>
            value.toLowerCase().includes(filterValue.toLowerCase())
        }),
        hide: addHiddenColumns(),
        select: addSelectedRows()
    });
    
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
          accessor: ({ firstName, middleName, lastName }) => {
            // Concatenate first name, middle name, and last name
            return `${firstName} ${middleName} ${lastName}`.trim();
            },
          header: "Name"
        }),
        table.column({
          accessor: "date_of_entry",
          header: "Date Of Entry",
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
          accessor: "email",
          header: "Email"
        }),
        table.column({
          accessor: ({ id }) => id,
          header: "",
          cell: ({ value }) => {
            return createRender(DataTableActions, { id: value });
        },
        plugins: {
            sort: {
                disable: true
            }
        }
        })
      ]);

      const { headerRows, pageRows, tableAttrs, tableBodyAttrs, pluginStates, flatColumns, rows } =
      table.createViewModel(columns);

      const { hasNextPage, hasPreviousPage, pageIndex } = pluginStates.page;
      const { filterValue } = pluginStates.filter;
      const { hiddenColumnIds } = pluginStates.hide;
      const { selectedDataIds } = pluginStates.select;

      const ids = flatColumns.map((col) => col.id);
      let hideForId = Object.fromEntries(ids.map((id) => [id, true]));

      $: $hiddenColumnIds = Object.entries(hideForId)
      .filter(([, hide]) => !hide)
      .map(([id]) => id);

      const hidableCols = ["name", "email", "date_of_entry"];
    </script>
    
    <div>
        <div class="flex items-center py-4">
            <div>
              <Input class="max-w-sm" 
              placeholder="Filter emails..." 
              type="text" 
              bind:value={$filterValue}/>
            </div>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild let:builder>
                  <Button variant="outline" class="ml-auto" builders={[builder]}>
                    Columns <ChevronDown class="ml-2 h-4 w-4" />
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
            <Table.Root {...$tableAttrs}>
              <Table.Header>
                {#each $headerRows as headerRow}
                  <Subscribe rowAttrs={headerRow.attrs()}>
                    <Table.Row>
                      {#each headerRow.cells as cell (cell.id)}
                        <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
                          <Table.Head {...attrs} class="[&:has([role=checkbox])]:pl-3">
                              {#if cell.id === "amount"}
                              <div class="text-right">
                                  <Render of={cell.render()} />
                              </div>
                              {:else if cell.id === "orders" }
                              <Button variant="ghost" on:click={props.sort.toggle}>
                                <Render of={cell.render()} />
                                <SortDesc class={"ml-2 h-4 w-4"} />
                              </Button>
                              {:else if cell.id === "email" }
                              <Button variant="ghost" on:click={props.sort.toggle}>
                                <Render of={cell.render()} />
                                <SortDesc class={"ml-2 h-4 w-4"} />
                              </Button>
                              {:else}
                              <Render of={cell.render()} />
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
                              {#if cell.id === "amount"}
                              <div class="text-right font-medium">
                                  <Render of={cell.render()} />
                              </div>
                              {:else if cell.id === "status"}
                              <div class="capitalize">
                                  <Render of={cell.render()} />
                              </div>
                              {:else}
                              <Render of={cell.render()} />
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
                {Object.keys($selectedDataIds).length} of{" "}
                {$rows.length} row(s) selected.
            </div>
            <Button
              variant="outline"
              size="sm"
              on:click={() => ($pageIndex = $pageIndex - 1)}
              disabled={!$hasPreviousPage}>Previous</Button>
            <Button
              variant="outline"
              size="sm"
              disabled={!$hasNextPage}
              on:click={() => ($pageIndex = $pageIndex + 1)}>Next</Button>
          </div>
    </div>
    