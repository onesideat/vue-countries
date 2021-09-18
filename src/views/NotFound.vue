<template>
    <Header />

    <div class="wrapper page-404">
        <h1>Page Not Found</h1>
    </div>

    <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default defineComponent({
    name: 'NotFound',
    components: {
        Header,
        Footer
    },
});
</script>

<style scoped lang="scss">
.page-404 {
    text-align: center;

    h1 {
        color: #fff;
    }
}
</style>