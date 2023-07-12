import { pokeApi } from '@/api';
import { Layout } from '@/components/layouts';
import { Grid } from '@nextui-org/react';
import { GetStaticProps, NextPage } from 'next';
import { SmallPokemon, PokemonListResponse } from '../interfaces';
import { PokemonCard } from '@/components/pokemon';


interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title='Listado de pokemons'>
      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))
        }
      </Grid.Container>
    </Layout>
  )
}

//Esta funcion se ejecuta solo en tiempo de compilacion y solo funciona en las pages
// se utiliza para generar los archivos estaticos de las consultas que queramos hacer
//se puede incluir todos los valores que necesitamos al momento de cargar el sitio web
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`,
  }))
  return {
    props: {
      pokemons
    }
  }
}

export default HomePage;