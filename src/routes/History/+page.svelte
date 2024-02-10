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

<section class="mt-8  py-5 text-center" >
    <h1 class="text-4xl text-cyan-500 font-bold">History</h1>
    <p class="text-md pl-52 pr-52 text-center mt-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in mollis lorem. 
        Nulla ac urna porttitor, ornare ligula id, volutpat arcu. Proin elementum ullamcorper maximus. 
        Donec arcu ex, pulvinar tincidunt malesuada a, consectetur non ipsum. Integer ac massa mauris. 
        Quisque ut orci eu justo eleifend lacinia non nec arcu. Donec consequat tincidunt augue, ut laoreet 
        risus accumsan at. Nullam bibendum orci quis placerat molestie.<br/><br/>

        Aenean molestie massa fringilla, rutrum velit vel, efficitur lacus. Aenean euismod massa at turpis viverra, 
        eget feugiat turpis tincidunt. Pellentesque in tortor hendrerit, hendrerit eros sit amet, feugiat dolor. 
        Proin massa nisi, vulputate sit amet mollis consectetur, vestibulum sit amet mauris. Quisque sit amet 
        tincidunt leo. Proin maximus orci nibh, et auctor elit lobortis sed. Aenean malesuada malesuada erat, 
        et gravida metus interdum a. Donec varius dui at libero condimentum, id aliquam turpis sodales. 
        Vivamus luctus quis mi et sodales. Curabitur faucibus quam quis turpis mattis, sit amet rutrum ex imperdiet.
        Pellentesque ornare eleifend justo et aliquet. Mauris varius ultrices pellentesque. 
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;</p>
    
</section>
