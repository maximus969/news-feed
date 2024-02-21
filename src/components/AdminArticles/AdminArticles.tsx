import { Grid, Typography, Box, Button, Card, CardMedia, CardContent } from '@mui/material'
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
        {articles.map((article) => (
          <Grid item xs={3} key={article.id}>
            <Card component={Link} to={`/admin/edit/${article.id}`}>
              <CardMedia sx={{ height: 140 }} image={article.image} title={article.articleTitle} />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {article.articleTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {article.text}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
