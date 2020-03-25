using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Helpers
{
    public static class PasswordHelper
    {
        static readonly string hash = @"h@4shValue";
        
        public static string Encrypt(this string pwd)
        {
            byte[] data = UTF8Encoding.UTF8.GetBytes(pwd);
            using (MD5CryptoServiceProvider md5 = new MD5CryptoServiceProvider())
            {
                byte[] keys = md5.ComputeHash(UTF8Encoding.UTF8.GetBytes(hash));
                using (TripleDESCryptoServiceProvider tripleDes = new TripleDESCryptoServiceProvider() { Key = keys, Mode = CipherMode.ECB, Padding = PaddingMode.PKCS7 })
                {
                    ICryptoTransform transform = tripleDes.CreateEncryptor();
                    byte[] results = transform.TransformFinalBlock(data, 0, data.Length);
                    return Convert.ToBase64String(results);
                }
            }
        }

        public static bool Validate(this string pwd, string fromServer)
        {
            return pwd.Encrypt() == fromServer;
        }
    }
}
