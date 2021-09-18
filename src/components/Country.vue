<template>
    <div class="country">
        <h1>{{ country.name }}</h1>
        <ul>
            <li><img :src="country.flag" alt="flag"></li>
            <li><b>Code:</b> {{ country.code.toUpperCase() }}</li>
            <li><b>Capital:</b> {{ country.capital }}</li>
            <li><b>Continent:</b> {{ country.region }}</li>
            <li><b>Population:</b> {{ $filters.number_format(country.population) }}</li>
            <li><b>Area:</b> {{ $filters.number_format(country.area) }}</li>
            <li><b>Domains:</b> {{ country.domains.join(', ') }}</li>
        </ul>
    </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'Country',
    props: {
        country: {
            type: Object,
            required: true
        }
    }
})
</script>

<style lang="scss">
.country {
    color: #fff;

    ul {
        list-style: none;
        margin: 0;
        padding: 0;
    }

    img {
        display: block;
        max-width: 124px;
        margin: 0 auto 1rem;
    }
}
</style>