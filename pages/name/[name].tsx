import { pokeApi } from '@/api'
import { Layout } from '@/components/layouts'
import { PokemonData } from '@/interfaces/pokemon'
import { GetStaticProps, NextPage } from 'next'
import React, { useState } from 'react'
import { Row, Text, Grid, Card, Button, Container, Image } from '@nextui-org/react';
import { getPokemonInfo, localFavorites } from '@/utils'
import confetti from 'canvas-confetti';
import { PokemonListResponse } from '@/interfaces'


interface Props {
    pokemon: PokemonData
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {



    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id);
        setIsInFavorites(!isInFavorites);
        if (!isInFavorites) {
            confetti({
                zIndex: 999,
                particleCount: 100,
                spread: 160,
                angle: -100,
                origin: {
                    x: 0.9,
                    y: 0.1
                }

            })
        }
    }

    const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id));

    return (
        <Layout title={pokemon.name}>
            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card isHoverable={true} css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image
                                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                                alt={pokemon.name}
                                height={200}
                                width='100%'
                            ></Card.Image>
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card isHoverable css={{ padding: '30px' }}>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform='capitalize'>{pokemon.name}</Text>
                            <Button color='gradient' onClick={onToggleFavorite} ghost={!isInFavorites}>
                                {isInFavorites ? 'Guardado ' : 'Guardar '} en favoritos
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}> Sprites:</Text>
                            <Container direction='row' display='flex' gap={0}>
                                <Image
                                    src={pokemon.sprites.front_default}
                                    alt={pokemon.name}
                                    height={100}
                                    width={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_default}
                                    alt={pokemon.name}
                                    height={100}
                                    width={100}
                                />
                                <Image
                                    src={pokemon.sprites.front_shiny}
                                    alt={pokemon.name}
                                    height={100}
                                    width={100}
                                />
                                <Image
                                    src={pokemon.sprites.back_shiny}
                                    alt={pokemon.name}
                                    height={100}
                                    width={100}
                                />
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { name } = params as { name: string };
    return {
        props: {
            pokemon: await getPokemonInfo(name)
        }
    }
}

export async function getStaticPaths() {
    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

    const pokemonNames: string[] = data.results.map(pokemon => pokemon.name);

    return {

        paths: pokemonNames.map(name => ({
            params: { name }
        })),
        fallback: false
    }
}
export default PokemonPage;
