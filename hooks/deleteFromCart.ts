export const deleteFromCart = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:7777/api/cart/${id}`, {
        mode: 'cors',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
      } else {
        const error = await response.json();
      }
    } catch (error) {
    }
  };