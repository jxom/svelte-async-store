<script>
  import heelflip from '../../src/svelte';

  const getCharacters = async () => fetch('https://rickandmortyapi.com/api/character').then((res) => res.json());
  const store = heelflip.fetch('characters', getCharacters, {
    initialResponse: {
      results: [
        {
          id: 1,
          name: 'Rick Sanchez',
        },
        {
          id: 2,
          name: 'Morty Smith',
        },
        {
          id: 3,
          name: 'Summer Smith',
        },
      ],
    },
  });

  $: {
    console.log($store);
  }
</script>

<div>
  <h1>Characters</h1>
  {#if $store.isLoading}
    <p>Loading...</p>
  {/if}
  {#if $store.isSuccess}
    <ul>
      {#each $store.response.results as character}
        <li>{character.name}</li>
      {/each}
    </ul>
  {/if}
  {#if $store.isError}
    <p>Awwies</p>
  {/if}
</div>
