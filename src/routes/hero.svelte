<script lang="ts">
    import HeaderImg from '$lib/images/family.jpg';

    export const imagePath: string = HeaderImg;
</script>   
<header class="header py-4 px-6 flex justify-between items-center">
    <div class="header-left flex-1">
        <h1 class="website-name text-[#2C541D] text-8xl text-center font-bold">ചെമ്മണൂർ</h1>
        <h2 class="website-nam text-5xl text-center font-light mt-4">കുടുംബയോഗം</h2>
    </div>
    <div class="header-right">
        <img src={imagePath} alt="Header Image" class="max-w-full h-auto">
    </div>
</header>