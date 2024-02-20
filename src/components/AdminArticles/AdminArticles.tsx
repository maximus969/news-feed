import { Grid, Typography, Box, Button, Card, CardMedia, CardContent, CardActionArea } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPartnersArticles } from '../../api'
import { IPartnersPosts } from '../../types'

export const AdminArticles: React.FC = () => {
  const [articles, setArticles] = useState<IPartnersPosts[]>([])

  useEffect(() => {
    ;(async () => {
      const articlesList = await getPartnersArticles()
      setArticles(articlesList)
    })()
  }, [])

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
        {articles.map((item) => {
          return (
            <Grid item xs={3} key={item.id}>
              <Card>
                <CardActionArea component={Link} to={`/admin/edit/${item.id}`}>
                  <CardMedia component={'img'} sx={{ height: 140 }} image={item.image} alt={item.articleTitle} />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.articleTitle}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
