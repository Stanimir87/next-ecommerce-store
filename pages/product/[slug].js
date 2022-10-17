import {
  Button,
  Card,
  Grid,
  Link,
  List,
  ListItem,
  Typography,
} from "@material-ui/core";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React from "react";
import Layout from "../../components/Layout";
import data from "../../utils/data";
import useStyles from "../../utils/styles";
import Image from "next/image";
import Product from "../../models/Product";
import db from "../../utils/db";

export default function ProductScreen(props) {
  const {product} = props;
  const classes = useStyles();
  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography>Back to products</Typography>
          </Link>
        </NextLink>
      </div>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <Image
            src={product.image}
            alt={product.name}
            width={740}
            height={640}
            layout="responsive"
          ></Image>
        </Grid>
        <Grid item md={6} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">Name: {product.name}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>

            <ListItem>
              <Typography>Description: {product.description}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Stock: {product.countInStock > 0 ?'In stock' : 'Out of stock'}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>BGN {product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const {params} = context;
  const {slug} = params;

  await db.connect();
  const product = await Product.findOne({slug}).lean();
  await db.disconnect();
  console.log(product);
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
}