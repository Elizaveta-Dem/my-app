export const updateQuantity = async (id: number, quantity: number) => {
    try {
      const response = await fetch(`http://localhost:7777/api/cart/${id}`, {
        mode: 'cors',
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });
  
      if (response.ok) {
      } else {
        const error = await response.json();
      }
    } catch (error) {
    }
  };