import { useTheme, Text, Spacer, Link } from '@nextui-org/react';
import Image from 'next/image';
import NextLink from 'next/link';


export const Navbar = () => {
    const { theme } = useTheme();

    return (
        <div style={{
            display: "flex",
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'start',
            padding: '0x 20px',
            backgroundColor: theme?.colors.gray600.value
        }}>
            <Image src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
                alt='Icono de la app' width={70} height={70}></Image>
            <NextLink legacyBehavior href='/' passHref>
                <Link >
                    <Text h2>P</Text>
                    <Text h3>okemon</Text>
                </Link>
            </NextLink>

            <Spacer css={{ flex: 1 }} />
            <NextLink legacyBehavior href='/favorites' passHref>
                <Link css={{marginRight:'10px'}} >
                    <Text>Favoritos</Text>
                </Link>
            </NextLink>

        </div>
    )
}
