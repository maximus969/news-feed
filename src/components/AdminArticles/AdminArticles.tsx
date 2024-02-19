import { Grid, Typography, Box, Button, Card, CardMedia, CardContent } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

// страница списка партнерских новостей
export const AdminArticles: React.FC = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={9} sx={{ mb: 3 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 3, mt: 3 }}>
            Партнерские статьи
          </Typography>
        </Grid>

        <Grid item xs={3}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button component={Link} to="/admin/create" color="success" variant="contained">
              Добавить новую
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Card>
            <CardMedia
              component={Link}
              to="/admin.edit/:id"
              sx={{ height: 140 }}
              image="/static/images/cards/contemplative-reptile.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all
                continents except Antarctica
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
