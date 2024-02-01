<script lang="ts">
    import type { PageData } from './$types';
    import Card from "$lib/components/ui/card/card.svelte";
    import { onMount } from 'svelte';

    export let data: PageData;

    let communityDetails = '';
    let communityHistory = '';

    onMount(async () => {
        // Assuming these details would come from an API or a store in a real app
        communityDetails = 'The Chemmanoor family is a vibrant community with a rich heritage that dates back to several centuries. Known for their unity, cultural values, and contributions to society, the members of the Chemmanoor family have always been at the forefront of social and charitable activities.';
        communityHistory = 'The history of the Chemmanoor family is as fascinating as it is inspiring. Originating from the lush landscapes of Kerala, India, the family has grown over the years while maintaining its strong cultural roots. The community’s history is filled with stories of resilience, hard work, and the importance of family bonds.';
    });
</script>

<section class="mt-8">
    
        <h2 class="text-xl font-semibold">About the Chemmanoor Family Community</h2>
        <p class="text-md">{communityDetails}</p>
    
</section>

<section class="mt-8">
    <Card>
        <h2  class="text-xl font-semibold">History of the Community</h2>
        <p  class="text-md">{communityHistory}</p>
    </Card>
</section>
