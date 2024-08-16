import React, { useEffect, useState } from 'react'

const YachtImportView = () => {
  const [yachts, setYachts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const importYacht = async (yacht: any) => {
    setLoading(true)
    try {
      const result = await fetch('/api/yatco/import', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(yacht),
        credentials: 'include',
      })
      if (!result.ok) throw new Error('Failed to import yachts')
      const data = await result.json()
      window.location.href = `/admin/collections/yachts/${data.id}` as string
    } catch (err) {
      console.error(err)
      alert('Failed to import yachts')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const loadYachts = async () => {
      try {
        const data = await fetch('/api/yatco/yachts')
        const yachts = await data.json()
        setYachts(yachts)
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    loadYachts()
  }, [])

  if (loading)
    return (
      <div
        style={{
          display: 'grid',
          placeItems: 'center',
          height: '100vh',
        }}
      >
        Loading...
      </div>
    )
  if (error) return <div>Error: {error.message}</div>

  return (
    <div style={{ padding: '20px', overflowX: 'scroll' }}>
      <a
        href="/admin"
        style={{
          textDecoration: 'none',
          color: '#a8a8a8',
        }}
      >
        Back to admin panel
      </a>
      <h1>Yachts import</h1>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
        }}
      >
        <thead>
          <tr>
            <th style={rowCss}>Index</th>
            <th style={rowCss}>Actions</th>
            <th style={rowCss}>Name</th>
            <th style={rowCss}>Model</th>
            <th style={rowCss}>Price</th>
            <th style={rowCss}>LOA</th>
            <th style={rowCss}>Beam</th>
            <th style={rowCss}>Builder</th>
            <th style={rowCss}>Category</th>
            <th style={rowCss}>City</th>
            <th style={rowCss}>Continent</th>
            <th style={rowCss}>Country</th>
            <th style={rowCss}>Cruising</th>
            <th style={rowCss}>Crypto</th>
            <th style={rowCss}>Length</th>
            <th style={rowCss}>State</th>
            <th style={rowCss}>Material</th>
            <th style={rowCss}>Max Draft</th>
            <th style={rowCss}>Min Draft</th>
            <th style={rowCss}>Region</th>
            <th style={rowCss}>Rooms</th>
            <th style={rowCss}>Sleeps</th>
            <th style={rowCss}>Subcategory</th>
            <th style={rowCss}>Tonnage</th>
            <th style={rowCss}>Year Built</th>
            <th style={rowCss}>Year Model</th>
            <th style={rowCss}>Photos</th>
            <th style={rowCss}>Description</th>
          </tr>
        </thead>
        <tbody>
          {yachts.map((yacht, index) => (
            <tr key={index}>
              <td style={rowCss}>{index + 1}</td>
              <td style={rowCss}>
                <button onClick={() => importYacht(yacht)}>Import</button>
              </td>
              <td style={rowCss}>{yacht.name}</td>
              <td style={rowCss}>{yacht.model}</td>
              <td style={rowCss}>{yacht.price}</td>
              <td style={rowCss}>{yacht.LOA}</td>
              <td style={rowCss}>{yacht.beam}</td>
              <td style={rowCss}>{yacht.builder}</td>
              <td style={rowCss}>{yacht.category}</td>
              <td style={rowCss}>{yacht.city}</td>
              <td style={rowCss}>{yacht.continent}</td>
              <td style={rowCss}>{yacht.country}</td>
              <td style={rowCss}>{yacht.cruising?.toString() ?? 'Unknown'}</td>
              <td style={rowCss}>{yacht.crypto?.toString() ?? 'Unknown'}</td>
              <td style={rowCss}>{yacht.length}</td>
              <td style={rowCss}>{yacht.state}</td>
              <td style={rowCss}>{yacht.material}</td>
              <td style={rowCss}>{yacht.maxDraft}</td>
              <td style={rowCss}>{yacht.minDraft}</td>
              <td style={rowCss}>{yacht.region}</td>
              <td style={rowCss}>{yacht.rooms}</td>
              <td style={rowCss}>{yacht.sleeps}</td>
              <td style={rowCss}>{yacht.subcategory}</td>
              <td style={rowCss}>{yacht.tonnage}</td>
              <td style={rowCss}>{yacht.yearBuilt}</td>
              <td style={rowCss}>{yacht.yearModel}</td>
              <td style={rowCss}>{yacht.photos.toString()}</td>
              <td style={rowCss}>
                {`${yacht.description?.substring(0, 50) ?? 'Unknown'}  ${
                  yacht.description?.length > 50 ? '...' : ''
                }`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const rowCss = {
  border: '1px solid #dddddd',
  padding: '8px',
  display: 'table-cell',
}

export default YachtImportView
