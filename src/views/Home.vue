<template>
    <Header />

    <div class="wrapper home">
        <Search />
    </div>

    <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
import Search from '@/components/Search.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
    name: 'Home',
    components: {
        Header,
        Search,
        Footer
    },
});
</script>
