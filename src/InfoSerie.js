import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom';
import { Badge } from 'reactstrap';

const InfoSerie = ({ match }) => {
    const [form, setForm] = useState({
        name: '',
        comments: ''
    })
    const [success, setSuccess] = useState(false)
    const [mode, setMode] = useState('INFO')
    const [genres, setGenres] = useState([])
    const [data, setData]  = useState({})
    const [genreId, setGenreId]  = useState('')

    useEffect(() => {
        axios.get('/api/series/' + match.params.id).then(res => {
            setData(res.data)
            setForm(res.data)
        })
    }, [match.params.id])

    useEffect(() => {
        axios.get('/api/genres/').then(res => {
            const genres = res.data.data;
            setGenres(genres)
            const encontrado = genres.find(value => data.genre === value.name)
            if (encontrado){
                setGenreId(encontrado.id)
            }
        })
    }, [data])

    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }

    const onChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value
        })
    }
    const onChangeGender = evt => {
        setGenreId(evt.target.value)
    }

    const seleciona = value => () =>  {
        setForm({
            ...form,
            status: value

        })
    }
    const save = () => {
        axios.put('/api/series/'+ match.params.id, {
            ...form,
            'genre_id': genreId
        }).then(res => {   
            setSuccess(true)
        })
    }
    if (success){
        return <Redirect to="/series" />
    }
    return (
        <div>
            <header style={masterHeader}>
                <div className='h-100' style={{background: 'rgba(0,0,0,0.7)'}}>
                    <div className="h-100 container">
                        <div className="row h-100 align-items-center">
                            <div className="col-3"> 
                                <img alt={data.name} src={data.poster} className="img-fluid img-thumbnail"></img>
                            </div>
                            <div className="col-8">
                                <h1 className="font-wheight-light text-white">{data.name}</h1>
                                <div className="lead text-white">
                                    { data.status === 'ASSISTIDO' &&  <Badge color="success"> Assistir</Badge>}
                                    { data.status === 'PARA_ASSISTIR' &&  <Badge color="warning"> Para Assistir</Badge>}
                                    Gênero : {data.genre}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            <div className="container">
                <button className="btn btn-primary"  onClick={() => setMode('EDIT') }>Editar</button>
            </div>
            {
                mode === 'EDIT' && 
                <div className="container">
                    <h1>Editar Série</h1>
                    <button className="btn btn-primary" onClick={() => setMode('INFO') }>Cancelar Edição</button>
                    <form>
                        <div className="form-group">
                            <label htmlFor="nome">Nome</label>
                            <input type="text" className="form-control" value={form.name} onChange={onChange('name')} id="name" placeholder="Nome da Série" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="nome">Comentários</label>
                            <input type="text" value={form.comments} className="form-control" onChange={onChange('comments')} id="comentarios" placeholder="Comentário" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="genero">Genêro</label>
                            <select className="form-control" onChange={onChangeGender} value={genreId}>
                                { genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
                            </select>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="status" checked={form.status === 'ASSISTIDO'} id="assistido" value="ASSISTIDO" onChange={seleciona('ASSISTIDO')}/>
                            <label className="form-check-label" htmlFor="assistido">
                                Assistido
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input" type="radio" name="status" checked={form.status === 'PARA_ASSISTIR'} id="paraAssistir" value="PARA_ASSISTIR" onChange={seleciona('PARA_ASSISTIR')}/>
                            <label className="form-check-label" htmlFor="assistir">
                                Para Assistir
                            </label>
                            </div>
                        <button type="button" className="btn btn-primary" onClick={save}>Salvar</button>

                    </form>
                </div>
            }
        </div>
    )
}
export default InfoSerie;