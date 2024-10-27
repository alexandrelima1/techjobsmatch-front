// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, TextField, Button, Typography, CircularProgress, Grid, 
  Card, CardContent, CardMedia, Link 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

function App() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://techjobsmatch.onrender.com/jobs', {
        params: { search, category, limit: 10 },
      });
      setJobs(response.data.jobs);
    } catch (error) {
      console.error('Erro ao buscar vagas:', error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <Container maxWidth="md" style={{ marginTop: '40px', backgroundColor: 'rgba(255, 255, 255, 0.9)', padding: '20px', borderRadius: '10px' }}>
      <Typography variant="h3" align="center" gutterBottom>
        TechJobsMatch - Vagas de TI Remotas
      </Typography>

      <Grid container spacing={2} justifyContent="center" style={{ marginBottom: '20px' }}>
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            label="Palavras-chave (ex: developer)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            label="Categoria (ex: software-dev)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={2}>
          <Button 
            fullWidth 
            variant="contained" 
            onClick={fetchJobs} 
            style={{ height: '56px' }}
            startIcon={<SearchIcon />}
          >
            Buscar
          </Button>
        </Grid>
      </Grid>

      {loading ? (
        <Grid container justifyContent="center">
          <CircularProgress />
        </Grid>
      ) : (
        <Grid container spacing={2}>
          {jobs.map((job) => (
            <Grid item xs={12} key={job.id}>
              <Card style={{ display: 'flex', alignItems: 'center', padding: '10px' }}>
                {job.company_logo && (
                  <CardMedia
                    component="img"
                    style={{ width: 120, height: 120, objectFit: 'contain', marginRight: '20px' }}
                    image={job.company_logo}
                    alt={`${job.company_name} logo`}
                  />
                )}
                <CardContent style={{ flex: 1 }}>
                  <Typography variant="h5" component="div">
                    {job.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {job.company_name} - {job.candidate_required_location}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {job.salary || 'Salário não informado'}
                  </Typography>
                  <Button size="small" color="primary">
                    <Link href={job.url} target="_blank" rel="noopener" underline="none">
                      Ver detalhes
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default App;
