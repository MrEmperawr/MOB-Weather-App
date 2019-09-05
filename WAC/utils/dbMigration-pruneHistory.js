

const doc = getFromDb();

const oldHist = doc.history;
const newHist = oldHist.splice(0, 642);
doc.history = newHist;

doc.history = doc.history.splice(0, 642);

saveToDb(doc);
