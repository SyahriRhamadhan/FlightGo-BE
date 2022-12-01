import transaction from "../models/TransactionModel.js";
import product from "../models/ProductModel.js";

export const cereateTransaction = async(req, res) => {
    try {
        if(req.user.role == "admin") {
            return res.status(400).json({
                success: false,
                message: "Kamu adalah admin tidak bisa transaksi",
            });
        }else{
            const Transaction = await transaction.create({
                productId: req.params.id,
                userId: req.user.userId,
                bukti_Pembayaran: req.body.bukti_Pembayaran,
                status: "menunggu",
            })
            res.status(201).send({
                status: 201,
                message: 'Berhasil Memesan Silahkan menunggu',
                data: Transaction
            })
        }
    } catch (error) {
        res.status(402).json({
            status: "FAIL",
            message: error.message,
        });
    }
}

export const accept = async(req, res) => {
    if(req.user.role !== "admin") {
        return res.status(400).json({
            success: false,
            message: "Kamu tidak bisa mengakses ini",
        });
    }
   try {
    const check = await transaction.findOne({
        where: {
            id: req.params.id,
        }
    })
    const accept = await check.update({
        status:"Pesanan Diterima",
    })
    res.status(201).send({
        status: 201,
        message: 'Penawaran Diterima!',
        data: accept
    })
   } catch (error) {
    res.status(400).send({
        status: "FAIL",
        message: error.message,
    })
   }
}

export const reject = async(req, res) => {
    if(req.user.role !== "admin") {
        return res.status(400).json({
            success: false,
            message: "Kamu gak bisa nambah tiket dengan role member",
        });
    }
    try {
     const check = await transaction.findOne({
         where: {
             id: req.params.id,
         }
     })
     const reject = await check.update({
         status:"Pesanan Ditolak",
     })
     res.status(201).send({
         status: 201,
         message: 'Penawaran Ditolak!',
         data: reject
     })
    } catch (error) {
     res.status(400).send({
         status: "FAIL",
         message: error.message,
     })
    }
 }
 export const getTransactions = async (req, res) => {
    if(req.user.role !== "admin") {
        return res.status(400).json({
            success: false,
            message: "Kamu gak bisa mengakses ini",
        });
    }
    try {
        const sourceTransaction = await transaction.findAll({
            include: product
        })
        res.status(201).send({
            status: 201,
            data: sourceTransaction
        })
    } catch (error) {
        res.status(400).send({
            status: "FAIL",
            message: error.message,
        })
    }
}
 export const getTransactionByID = async (req, res) => {
    try {
        const sourceTransaction = await transaction.findOne({
            where: {
                id: req.params.id
            },
            include: product
        })
        res.status(201).send({
            status: 201,
            data: sourceTransaction
        })
    } catch (error) {
        res.status(400).send({
            status: "FAIL",
            message: error.message,
        })
    }
}