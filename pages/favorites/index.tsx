import { Layout } from '@/components/layouts'
import { localFavorites } from '@/utils'
import { Container, Text, Image, Grid, Card } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { NoFavorites } from '../../components/ui';
import { FavoritePokemons } from '@/components/pokemon';


const FavoritesPage = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons);
  }, [])


  return (
    <Layout title='Pokemons Favoritos'>
      {
        favoritePokemons.length === 0
          ? (<NoFavorites />)
          : (<FavoritePokemons favoritePokemons={favoritePokemons} />)
      }
    </Layout>
  )
}

export default FavoritesPage