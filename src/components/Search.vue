<template>
    <div class="search">
        <div class="title">
            <span class="badge">100% Free</span>
            <h2>Fastest way to learn <span>countries <svg class="button-stroke" viewBox="0 0 154 13"><path d="M2 2c49.7 2.6 100 3.1 150 1.7-46.5 2-93 4.4-139.2 7.3 45.2-1.5 90.6-1.8 135.8-.6" fill="none" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke"></path></svg></span></h2>
            <p>Search a country by it's name and find out the main information</p>
        </div>

        <div class="field">
            <input type="text" placeholder="Search for a country" v-model="search" @input="onChange" @focus="onChange" @blur="onBlur" autofocus autocomplete="off">
            <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M11 2c4.968 0 9 4.032 9 9s-4.032 9-9 9-9-4.032-9-9 4.032-9 9-9zm0 16c3.867 0 7-3.133 7-7 0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7zm8.485.071l2.829 2.828-1.415 1.415-2.828-2.829 1.414-1.414z"/></svg></span>

            <ul class="dropdown" v-show="showResults && results.length">
                <li v-for="(item, key) in results" :key="key" @click="onSelect(item)" v-html="item.name.replace(search, '<b>'+ search +'</b>')"></li>
            </ul>
        </div>

        <button type="button" class="ui-button" :disabled="!selected" @click="onClick()">Show Country</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import config from '@/config/';

let countries: Array<unknown> = [];

type dataType = {
    search: string;
    selected: {
        code: string,
        name: string
    } | null;
    results: Array<any>;
    showResults: boolean
}

export default defineComponent({
    name: 'Search',
    data: () => ({
        search: '',
        selected: null,
        results: new Array<any>(),
        showResults: false,
    } as dataType),
    methods: {
        onChange: function() {
            if (!this.search.length)
                this.results = [];
            else
                this.results = countries.filter((a: any) => {
                    return a.name.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
                }).sort((a:any, b:any) => {
                    return a.name.toLowerCase().indexOf(this.search.toLowerCase()) - b.name.toLowerCase().indexOf(this.search.toLowerCase())
                });

            if (this.results.length == 1 && this.search.length == this.results[0].name.length)
                this.showResults = true;
            else if (this.results.length) {
                this.showResults = true;
                this.selected = null;
            } else {
                this.selected = null;
            }
        },
        onBlur: function(e: Event) {
            setTimeout(() => {
                if (document.activeElement != e.target)
                    this.showResults = false;
            }, 150);
        },
        onSelect: function(item: any) {
            this.search = item.name;
            this.selected = item;
            this.showResults = false;
        },
        onClick: function() {
            if (this.selected !== null) {
                this.$router.push('/get/' + this.selected.code)
            }
        }
    },
    mounted() {
        fetch(config.webservice + '/graphql', {
            method: 'POST',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({query: `{
              countries {
                name
                code
              }
            }`})
        }).then(async (r) => {
            let data = await r.json();

            countries = data.data.countries;
        }).catch(() => {
            console.log(`Couldn't load the countries`);
        });
    }
});
</script>

<style scoped lang="scss">
@import '../styles/variables';

.search {
    text-align: center;

    .title {
        .badge {
            display: inline-block;
            padding: 4px 10px;
            color: $color-active;
            font-size: 80%;
            border-radius: 36px;
            font-weight: 700;
            text-transform: uppercase;
            background: rgba($color-active, 0.2);
            opacity: 0.8;
        }

        h2 {
            margin: 0;
            margin-top: 1.5rem;
            margin-bottom: 1.25rem;
            font-size: 56px;
            font-weight: 700;
            line-height: 1;
            color: #fff;

            span {
                position: relative;
                color: $color-active;

                svg {
                    position: absolute;
                    width: 168px;
                    height: 14px;
                    bottom: 0;
                    left: 50%;
                    stroke-width: 4;
                    stroke: $color-active;
                    transform: translateX(-50%);
                }
            }
        }

        p {
            margin: 0;
            margin-bottom: 2.5rem;
            font-size: 1.125rem;
            color: $text-color;
        }
    }

    .field {
        position: relative;
        width: 620px;
        max-width: 100%;
        margin: 0 auto;
        margin-bottom: 1.25rem;
        background: #fff;
        padding: 10px 16px;
        border-radius: 6px;
        box-shadow: 0 6px 18px 0 rgba(0, 35, 90, 0.08), 0 0 2px 0 rgba(0, 35, 90, 0.06);

        span {
            position: absolute;
            display: block;
            left: 0.75rem;
            top: 50%;
            background: transparent;
            line-height: 1;
            border: 0;
            transform: translateY(-50%);
            pointer-events: none;

            svg {
                width: 1.25rem;
                height: 1.25rem;
                margin-top: 2px;
                fill: #bac4ce;
                transition: all .2s ease-in-out;
            }
        }

        input {
            color: #162a48;
            font: inherit;
            font-weight: 600;
            width: 100%;
            border: 0;
            outline: 0;
            padding-left: 2rem;

            &:focus + span svg {
                fill: $color-active
            }
        }

        .dropdown {
            position: absolute;
            top: 100%;
            max-height: 200px;
            background: #fff;
            width: calc(100% - 4rem);
            left: 2rem;
            margin: 0;
            padding: 0;
            color: #162a48;
            font-weight: 600;
            list-style: none;
            text-align: left;
            border-radius: 0 0 6px 6px;
            box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
            overflow: auto;
            animation: dropdownFadeIn 0.25s ease-in-out;

            li {
                padding: 1rem;
                cursor: pointer;
                transition: all .2s ease-in-out;

                &:hover {
                    background: #eee;
                }

                &:active {
                    background: #d1d1d1;
                }

                &:last-child {
                    border-radius: 0 0 6px 6px;
                }
            }
        }
    }
}

@keyframes dropdownFadeIn {
    from {
        opacity: 0;
        transform: translateY(-6px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>
