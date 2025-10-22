import { Router, Request, Response } from 'express';
import { supabase, WNBACard } from '../config/database';

const router = Router();

// GET /api/cards - Get all cards
router.get('/', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('wnba_cards')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ error: 'Failed to fetch cards' });
  }
});

// POST /api/cards - Create a new card
router.post('/', async (req: Request, res: Response) => {
  try {
    const cardData: Omit<WNBACard, 'id' | 'created_at' | 'updated_at'> = req.body;
    
    const { data, error } = await supabase
      .from('wnba_cards')
      .insert([cardData])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (error) {
    console.error('Error creating card:', error);
    res.status(500).json({ error: 'Failed to create card' });
  }
});

// GET /api/cards/:id - Get a specific card
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const { data, error } = await supabase
      .from('wnba_cards')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Card not found' });
      }
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error('Error fetching card:', error);
    res.status(500).json({ error: 'Failed to fetch card' });
  }
});

// PUT /api/cards/:id - Update a card
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const cardData: Partial<WNBACard> = req.body;
    
    const { data, error } = await supabase
      .from('wnba_cards')
      .update(cardData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Card not found' });
      }
      throw error;
    }

    res.json(data);
  } catch (error) {
    console.error('Error updating card:', error);
    res.status(500).json({ error: 'Failed to update card' });
  }
});

// DELETE /api/cards/:id - Delete a card
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const { error } = await supabase
      .from('wnba_cards')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting card:', error);
    res.status(500).json({ error: 'Failed to delete card' });
  }
});

export default router;