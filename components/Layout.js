import Head from "next/head";
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Link,
} from "@material-ui/core";
import useStyles from "../utils/styles";
import NextLink from "next/link";

export default function Layout({description, title, children }) {
  const classes = useStyles();

  return (
    <div>
      <Head>
        <title>{title ? `${title} - Marketplace` : 'Marketplace'}</title>
        {description && <meta name="description" content={description}></meta>}
      </Head>
      <AppBar position="static" className={classes.navbar}>
        <Toolbar>
          <NextLink href="/" passHref>
            <Link>
              <Typography className={classes.brand}>Marketplace</Typography>
            </Link>
          </NextLink>
          <div className={classes.grow}></div>
          <div>
            <NextLink href="/cart"  passHref>
                <Link>Cart</Link>
            </NextLink>
            <NextLink href="/login"  passHref>
                <Link>Login</Link>
            </NextLink>
          </div>
        </Toolbar>
      </AppBar>
      <Container className={classes.main}>{children}</Container>
      <footer className={classes.footer}>
        <Typography>Powered by Next, MUI, MongoDb.</Typography>
      </footer>
    </div>
  );
}
