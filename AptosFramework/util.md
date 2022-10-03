
<a name="0x1_util"></a>

# Module `0x1::util`

Utility functions used by the framework modules.


-  [Function `from_bytes`](#0x1_util_from_bytes)
-  [Function `address_from_bytes`](#0x1_util_address_from_bytes)


<pre><code></code></pre>



<a name="0x1_util_from_bytes"></a>

## Function `from_bytes`

Native function to deserialize a type T.

Note that this function does not put any constraint on <code>T</code>. If code uses this function to
deserialized a linear value, its their responsibility that the data they deserialize is
owned.


<pre><code><b>public</b>(<b>friend</b>) <b>fun</b> <a href="util.md#0x1_util_from_bytes">from_bytes</a>&lt;T&gt;(bytes: <a href="">vector</a>&lt;u8&gt;): T
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b>(<b>friend</b>) <b>native</b> <b>fun</b> <a href="util.md#0x1_util_from_bytes">from_bytes</a>&lt;T&gt;(bytes: <a href="">vector</a>&lt;u8&gt;): T;
</code></pre>



</details>

<details>
<summary>Specification</summary>



<pre><code><b>pragma</b> opaque;
</code></pre>



</details>

<a name="0x1_util_address_from_bytes"></a>

## Function `address_from_bytes`



<pre><code><b>public</b> <b>fun</b> <a href="util.md#0x1_util_address_from_bytes">address_from_bytes</a>(bytes: <a href="">vector</a>&lt;u8&gt;): <b>address</b>
</code></pre>



<details>
<summary>Implementation</summary>


<pre><code><b>public</b> <b>fun</b> <a href="util.md#0x1_util_address_from_bytes">address_from_bytes</a>(bytes: <a href="">vector</a>&lt;u8&gt;): <b>address</b> {
    <a href="util.md#0x1_util_from_bytes">from_bytes</a>(bytes)
}
</code></pre>



</details>