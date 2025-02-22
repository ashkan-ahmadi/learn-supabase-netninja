import { Link } from 'react-router-dom'
import supabase from '../config/supabaseConfig'
import { showErrorToast, showSuccessToast } from '../utils/utils'

export default function SmoothieCard(props) {
  const {
    smoothie: { id, title, method, rating, created_at },
    onDelete,
  } = props

  const created_at_formatted = new Date(created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  async function handleDelete() {
    try {
      // IMPORTANT: if you do not use .select(), data will return null
      const response = await supabase.from('smoothies').delete().eq('id', id).select()

      const { data, error } = response || {}

      console.log(response)

      if (error) {
        console.error(error)
        throw new Error(error?.message)
      }

      if (!data) {
        // IMPORTANT: do not use this validation if you aren't using .select()
        return
      }

      showSuccessToast('Deleted successfully')

      // update the UI (onDelete calls the function updateSmoothiesAfterDeletion)
      onDelete(id)
    } catch (error) {
      showErrorToast('There was an error. Please try again.')
      console.error(error)
    }
  }
  return (
    <div className="card">
      <h3 className="card-header">{title}</h3>
      <div className="card-body">
        <p className="card-subtitle">Rating: {rating}/10</p>
        <p>
          Created on: <b>{created_at_formatted}</b>
        </p>
        <p className="card-text">{method.length > 200 ? `${method.substring(0, 200)}...` : method}</p>
      </div>
      <div className="card-footer">
        {' '}
        <Link to={`/edit/${id}`} className="btn btn-light">
          <i className="bi bi-pencil"></i>
          <span className="visually-hidden">Edit</span>
        </Link>
        <button className="btn btn-light" onClick={handleDelete}>
          <i className="bi bi-trash3"></i>
          <span className="visually-hidden">Edit</span>
        </button>
      </div>
    </div>
  )
}
