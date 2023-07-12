import { SmallPokemon } from '@/interfaces'
import { Row, Text, Grid, Card } from '@nextui-org/react';
import { useRouter } from 'next/router';
import React, { FC } from 'react'

interface Props {
    pokemon: SmallPokemon
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
    const { id, name, img } = pokemon;
    const router = useRouter();
    const onClick = () => {
        router.push(`/name/${pokemon.name}`);
    }
    return (
        <Grid xs={6} sm={3} md={2} xl={1} key={id}>
            <Card onClick={onClick} isHoverable isPressable>
                <Card.Body css={{ p: 1 }}>
                    <Card.Image
                        src={img}
                        width="100%"
                        height={140}
                        alt={name}
                    />
                </Card.Body>
                <Card.Footer>
                    <Row wrap="wrap" justify="space-between" align="center">
                        <Text transform='capitalize'>{name}</Text>
                        <Text b>#{id}</Text>
                    </Row>
                </Card.Footer>
            </Card>

        </Grid>
    )
}
