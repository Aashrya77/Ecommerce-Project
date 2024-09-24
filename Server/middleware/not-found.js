const notFound = (req, res) => {
    res.status(500).send('Route does not exist')
}

module.exports = notFound