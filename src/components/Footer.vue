<template>
    <div class="footer">
        <p>© {{ year }} Copyright - Oneside. All rights reserved.</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const d = new Date();

export default defineComponent({
    name: 'Footer',

    data: () => ({
        year: d.getFullYear()
    })
})
</script>

<style scoped lang="scss">
@import '../styles/variables';

.footer {
    padding: 2rem 0;
    text-align: center;
    color: $text-color;
}
</style>