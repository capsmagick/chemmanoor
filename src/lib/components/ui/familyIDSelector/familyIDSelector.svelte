<script lang="ts">
  import { onMount } from 'svelte';
  import { chartNumber, generation, index } from '$lib/constants/dropdownOptions';
  import  {Select, SelectTrigger, SelectLabel, SelectValue, SelectContent, SelectItem } from '$lib/components/ui/Select';

  export let chartNumberSelection = '';
  export let generationSelection = '';
  export let indexSelection = '';

  let options = {
    chartNumbers: [{ value: '1', label: 'One' }],
    generations: [{ value: 'A', label: 'Gen A' }],
    indexes: [{ value: 'I', label: 'Index I' }]
  };

  onMount(async () => {
    options.chartNumbers = chartNumber.map(num => ({ value: num.toString(), label: num.toString() }));
    options.generations = generation.map(gen => ({ value: gen.toString(), label: gen.toString() }));
    options.indexes = index.map(idx => ({ value: idx.toString(), label: idx.toString() }));
  });
</script>

<style>
  .family-id-selector {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  @media (min-width: 640px) {
    .family-id-selector {
      flex-direction: row;
    }
  }
</style>


  <div class="family-id-selector border-2 p-5 ">
    <div class="">
      <label for="chartNumber" class="block text-sm font-medium text-gray-700">Chart</label>
      <select id="chartNumber" bind:value={chartNumberSelection} class="mt-1 border-2 p-2 block w-full text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
        <option value="">Select</option>
        {#each options.chartNumbers as { value, label }}
          <option value={value}>{label}</option>
        {/each}
      </select>
    </div>

    <div>
      <label for="generation" class="block text-sm font-medium text-gray-700">Generation</label>
      <select id="generation" bind:value={generationSelection} class="mt-1 block w-full text-base p-2 border-2 border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
        <option value="">Select</option>
        {#each options.generations as { value, label }}
          <option value={value}>{label}</option>
        {/each}
      </select>
    </div>

    <div>
      <label for="index" class="block text-sm font-medium text-gray-700">Index</label>
      <select id="index" bind:value={indexSelection} class="mt-1 block w-full border-2 p-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
        <option value="">Select</option>
        {#each options.indexes as { value, label }}
          <option value={value}>{label}</option>
        {/each}
      </select>
    </div>
  </div>


