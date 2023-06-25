import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import fs from 'fs';
import path from 'path';

const app = express();

app.use(bodyParser.json());
app.use(cors());

interface Grocery {
  id: number;
  name: string;
  amount: number;
  category: string;
  done: boolean;
}

const dataFilePath = path.join(__dirname, 'db.json');

let groceries: Grocery[] = [];

// Read from db.json file when the server starts
fs.readFile(dataFilePath, 'utf-8', (err, data) => {
  if (err) {
    console.log(`Error reading file from disk: ${err}`);
  } else {
    // parse JSON string to JSON object
    groceries = JSON.parse(data);
  }
});

app.get('/api/groceries', (req: Request, res: Response) => {
  res.json(groceries);
});

app.post('/api/groceries', (req: Request, res: Response) => {
  const grocery: Grocery = {
    id: Date.now(),
    name: req.body.name,
    amount: req.body.amount,
    category: req.body.category,
    done: req.body.done
  };

  groceries.push(grocery);

  // Write to db.json file whenever a new grocery is added
  fs.writeFile(dataFilePath, JSON.stringify(groceries), (err) => {
    if (err) throw err;
    console.log('Data written to file');
  });

  res.json(grocery);
});

app.put('/api/groceries/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { name, amount, category, done } = req.body;

  const groceryIndex = groceries.findIndex((grocery) => grocery.id === id);

  if (groceryIndex > -1) {
    groceries[groceryIndex] = { id, name, amount, category, done };

    // Write to db.json file whenever a grocery is updated
    fs.writeFile(dataFilePath, JSON.stringify(groceries), (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });

    res.json(groceries[groceryIndex]);
  } else {
    res.status(404).send({ error: 'Grocery not found' });
  }
});

app.delete('/api/groceries/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const groceryIndex = groceries.findIndex((grocery) => grocery.id === id);

  if (groceryIndex > -1) {
    groceries.splice(groceryIndex, 1);

    // Write to db.json file whenever a grocery is deleted
    fs.writeFile(dataFilePath, JSON.stringify(groceries), (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });

    res.json({ message: `Grocery id ${id} deleted.` });
  } else {
    res.status(404).send({ error: 'Grocery not found' });
  }
});

app.listen(3001, () => console.log('Server running on port 3001'));
