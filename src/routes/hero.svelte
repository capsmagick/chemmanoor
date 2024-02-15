<script lang="ts">
    import HeaderImg from '$lib/images/family.jpg';

    export const imagePath: string = HeaderImg;
</script>   
<header class="header py-4 px-6 flex flex-col md:flex-row justify-between items-center">
    <div class="header-left flex-1 md:text-center">
        <h1 class="website-name text-[#2C541D] text-4xl md:text-8xl font-bold">ചെമ്മണൂർ</h1>
        <h2 class="website-nam text-xl md:text-5xl text-center font-light mt-2 md:mt-4">കുടുംബയോഗം</h2>
    </div>
    <div class="header-right mt-4 md:mt-0 md:ml-4">
        <img src={imagePath} alt="Header Image" class="max-w-full h-auto">
    </div>
</header>