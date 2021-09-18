<template>
    <Header />

    <div class="wrapper get">
        <div class="loader" v-if="!country">
            <svg version="1.1" id="L6" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="96px" height="96" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
                <rect fill="none" stroke="#fff" stroke-width="4" x="25" y="25" width="50" height="50">
                    <animateTransform attributeName="transform" dur="0.5s" from="0 50 50" to="180 50 50" type="rotate" id="strokeBox" attributeType="XML" begin="rectBox.end"></animateTransform>
                </rect>
                <rect x="27" y="27" fill="#fff" width="46" height="50">
                    <animate attributeName="height" dur="1.3s" attributeType="XML" from="50" to="0" id="rectBox" fill="freeze" begin="0s;strokeBox.end"></animate>
                </rect>
            </svg>
        </div>
        <Country :country="country" v-else />
    </div>

    <Footer />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Header from '@/components/Header.vue';
import Country from '@/components/Country.vue';
import Footer from '@/components/Footer.vue';
import config from '@/config/';

export default defineComponent({
    name: 'Get',
    components: {
        Header,
        Country,
        Footer
    },
    data: () => ({
        country: null
    }),
    props: {
        id: {
            type: String,
            required: true
        }
    },
    mounted() {
        if (this.id.length !== 2)
            return this.$router.push('/404');

        fetch(config.webservice + '/graphql', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query: `{
                country(code: "${this.id}") {
                    name
                    code
                    capital
                    flag
                    population
                    area,
                    region
                    domains
                }
            }`})
        }).then(async (r) => {
            let data = await r.json();

            if (!data.data.country)
                this.$router.push('/404');

            this.country = data.data.country;
        }).catch(() => {
            this.$router.push('/404');
        });
    }
});
</script>

<style lang="scss">
.get {
    text-align: center;
}
</style>