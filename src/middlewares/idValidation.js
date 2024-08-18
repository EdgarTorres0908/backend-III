export const idValidation = (req, res, next) => {
    if (req.body.id && req.body.id !== req.params.productId) {
        res.status(404).json({ msg: 'no se pudo cambiar el ID del Producto' });
    } else {
        next();
    }
}