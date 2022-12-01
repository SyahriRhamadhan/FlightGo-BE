import product from "../models/ProductModel.js";


export const getproduct = async(req, res) => {
    try {
        const response = await product.findAll({
            attributes:['id','jenis_penerbangan','bentuk_penerbangan','kota_asal','bandara_asal','kota_tujuan','bandara_tujuan','depature_date','depature_time','kode_negara_asal','kode_negara_tujuan', 'price','kota_asal_','bandara_asal_','kota_tujuan_','bandara_tujuan_','depature_date_','depature_time_','kode_negara_asal_','kode_negara_tujuan_','price_','total_price','image_product','desctiption','createdAt','updatedAt']
        });
        res.json(response);
    } catch (error) {
        console.log(error);
    }
}

export const getproductById = async(req, res) => {
    const { id } = req.params;
    const Product = await product.findOne({
        where: { id: id },
    });
    if (!Product){
        return res.status(404).json({
            success: true,
            message: "Tidak ada tiket",
        });
    }
    res.json(Product);
}

export const createproduct = async(req, res) => {
    const { jenis_penerbangan,bentuk_penerbangan,kota_asal,bandara_asal,kota_tujuan,bandara_tujuan,depature_date,depature_time,kode_negara_asal, kode_negara_tujuan,price,kota_asal_,bandara_asal_,kota_tujuan_,bandara_tujuan_,depature_date_,depature_time_,kode_negara_asal_,kode_negara_tujuan_,price_,total_price,image_product,desctiption} = req.body;
    if(req.user.role !== "admin") {
        return res.status(400).json({
            success: false,
            message: "Kamu gak bisa nambah tiket dengan role member",
        });
    }
    try {
        await product.create({
    jenis_penerbangan: jenis_penerbangan,bentuk_penerbangan: bentuk_penerbangan,kota_asal: kota_asal,bandara_asal: bandara_asal,kota_tujuan: kota_tujuan,bandara_tujuan: bandara_tujuan,depature_date: depature_date, depature_time: depature_time,kode_negara_asal: kode_negara_asal,kode_negara_tujuan:kode_negara_tujuan, price: price,kota_asal_: kota_asal_,bandara_asal_: bandara_asal_,kota_tujuan_: kota_tujuan_,bandara_tujuan_: bandara_tujuan_,depature_date_: depature_date_,depature_time_: depature_time_,kode_negara_asal_: kode_negara_asal_,kode_negara_tujuan_: kode_negara_tujuan_,price_,total_price: total_price,image_product: image_product,desctiption: desctiption
        });
        return res.status(200).json({
            success: true,
            message: "tiket Berhasil ditambahkan",
        });
    } catch (error) {
        console.log(error);
    }
}

export const updateproduct = async(req, res) => {
    const { id } = req.params;
    const Product = await product.findOne({
        where: { id: id },
    });
    if (!Product){
        return res.status(404).json({
            success: true,
            message: "Tidak ada tiket",
        });
    }
    const { jenis_penerbangan,bentuk_penerbangan,kota_asal,bandara_asal,kota_tujuan,bandara_tujuan,depature_date,depature_time,kode_negara_asal, kode_negara_tujuan,price,kota_asal_,bandara_asal_,kota_tujuan_,bandara_tujuan_,depature_date_,depature_time_,kode_negara_asal_,kode_negara_tujuan_,price_,total_price,image_product,desctiption} = req.body;
    if(req.user.role !== "admin" ) {
        return res.status(400).json({
            success: false,
            message: "Kamu gak bisa update data product dengan role member",
        });
    }
        try {
            await product.update(
                { 
                    jenis_penerbangan: jenis_penerbangan,bentuk_penerbangan: bentuk_penerbangan,kota_asal: kota_asal,bandara_asal: bandara_asal,kota_tujuan: kota_tujuan,bandara_tujuan: bandara_tujuan,depature_date: depature_date, depature_time: depature_time,kode_negara_asal: kode_negara_asal, kode_negara_tujuan: kode_negara_tujuan,price: price,kota_asal_: kota_asal_,bandara_asal_: bandara_asal_,kota_tujuan_: kota_tujuan_,bandara_tujuan_: bandara_tujuan_,depature_date_: depature_date_,depature_time_: depature_time_,kode_negara_asal_: kode_negara_asal_,kode_negara_tujuan_: kode_negara_tujuan_,price_,total_price: total_price,image_product: image_product,desctiption: desctiption
                },
                {
                where: { id: id},
                }
            );
            return res.status(200).json({
                success: true,
                message: "product Berhasil diupdate",
            });
        } catch (error) {
            console.log(error);
        }
}

export const deleteproduct = async(req, res) => {
    const { id } = req.params;
    const dataBeforeDelete = await product.findOne({
    where: { id: id },
    });
    if (!dataBeforeDelete){
        return res.status(404).json({
            success: true,
            message: "Tidak ada tiket",
        });
    }
    if(req.user.role !== "admin" ) {
        return res.status(400).json({
            success: false,
            message: "Kamu gak bisa mengakses ini",
        });
    }
    const parsedDataProfile = JSON.parse(JSON.stringify(dataBeforeDelete));

    if (!parsedDataProfile) {
        return res.status(400).json({
            success: false,
            message: "product doesn't exist or has been deleted!",
        });
    }

    await product.destroy({
        where: { id },
    });

    return res.status(200).json({
        success: true,
        message: "Delete Data Successfully",
    });
}
    